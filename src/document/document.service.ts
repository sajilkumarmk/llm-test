import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel as InjectSequelizeModel } from '@nestjs/sequelize';
import { Documents } from 'src/model/documents.model';
import { CohereClient } from "cohere-ai";

@Injectable()
export class DocumentService {
    constructor(
        @InjectSequelizeModel(Documents)
        private readonly documentModel: typeof Documents,
    ) { }

    private cohere = new CohereClient({ token: process.env.COHERE_APIKEY });

    async createDocument(DocumentsData: Partial<Documents>): Promise<any> {
        try {
            const text = DocumentsData?.text;
            console.log("text : ", text);

            const embed = await this.cohere.embed({
                texts: [text],
                model: "embed-english-v3.0",
                inputType: "search_document"
            });
            console.log("Embedding:", embed);
            DocumentsData.embedding = embed.embeddings[0];
            console.log('Document : ', DocumentsData);

            const Document = await this.documentModel.create(DocumentsData);
            return Document;
        } catch (error) {
            console.error("Error:", error);
            return new InternalServerErrorException(error);
        }
    }

    async queryDocument(text: any): Promise<any> {
        try {
            console.log("text : ", text.text);
            console.log("collection_id : ", text.collection_id);

            const embed = await this.cohere.embed({
                texts: [text.text],
                model: "embed-english-v3.0",
                inputType: "search_query"
            });
            // console.log("Embedding:", embed);
            const documents = await Documents.findAll({
                where: { collection_id: text.collection_id },
                attributes: ['id', 'text', 'embedding'],
                raw: true, // Retrieve raw data for efficient similarity calculation
            });

            const mostSimilar = documents
                .map((doc) => ({
                    id: doc.id,
                    text: doc.text,
                    similarity: this.calculateCosineSimilarity(embed.embeddings[0], doc.embedding),
                }))
                // .filter((doc) => doc.similarity > 0.5)
                .sort((a, b) => b.similarity - a.similarity)
                .slice(0, 10);
            return mostSimilar;
        } catch (error) {
            console.error("Error:", error);
            return new InternalServerErrorException(error);
        }
    }

    calculateCosineSimilarity(vec1: any[], vec2: any[]): number {

        if (vec1.length !== vec2.length) {
            throw new Error("Vectors must have the same length");
        }

        const dotProduct = vec1.reduce((sum, value, index) => sum + (value * vec2[index]), 0);
        const magnitude1 = Math.sqrt(vec1.reduce((sum, value) => sum + (value * value), 0));
        const magnitude2 = Math.sqrt(vec2.reduce((sum, value) => sum + (value * value), 0));

        if (magnitude1 === 0 || magnitude2 === 0) {
            // Avoid division by zero
            return 0;
        }

        return dotProduct / (magnitude1 * magnitude2);
    }
}
