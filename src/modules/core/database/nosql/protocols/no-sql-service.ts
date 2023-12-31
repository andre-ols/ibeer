export interface NoSqlService {
	connect(): Promise<void>
	disconnect(): Promise<void>
	isConnected(): Promise<boolean>
	getCollection(name: string): Promise<Collection>
}

export interface Collection {
	insertOne(data: any): Promise<any>
	insertMany(data: any[]): Promise<any>
	findOne(data: any): Promise<any>
	findMany(data: any): Promise<any>
	updateOne(data: any): Promise<any>
	updateMany(data: any): Promise<any>
	deleteOne(data: any): Promise<any>
	deleteMany(data: any): Promise<any>
}
