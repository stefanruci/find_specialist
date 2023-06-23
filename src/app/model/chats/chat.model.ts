
export interface Chat {
    id?: string;
    senderId: string;
    receiverId: string;
    roomId:string;
    message: string;
    createdAt: Date;
}
