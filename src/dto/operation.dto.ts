export interface OperationItemDto {
    id: string;
    userId: string;
    operation: string;
    operandA: number;
    operandB?: number | null;
    result: string;
    timestamp: string;
}

export interface PaginatedOperationResponseDto {
    total: number;
    page: number;
    size: number;
    data: OperationItemDto[];
}

export interface DeleteResponseDto {
    message: string;
}
