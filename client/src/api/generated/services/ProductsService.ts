/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProductDTO } from '../models/CreateProductDTO';
import type { UpdateProductDTO } from '../models/UpdateProductDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductsService {
    /**
     * List all products with optional filtering
     * @param category Filter by category
     * @param search Search by name/description keyword
     * @returns any Products fetched successfully
     * @throws ApiError
     */
    public static getApiProducts(
        category?: string,
        search?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/products',
            query: {
                'category': category,
                'search': search,
            },
        });
    }
    /**
     * Create a product (Admin only)
     * @param requestBody
     * @returns any Product created successfully
     * @throws ApiError
     */
    public static postApiProducts(
        requestBody: CreateProductDTO,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/products',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Not authorized`,
                403: `Admin access required`,
            },
        });
    }
    /**
     * Get product by ID
     * @param id
     * @returns any Product fetched successfully
     * @throws ApiError
     */
    public static getApiProducts1(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/products/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Product not found`,
            },
        });
    }
    /**
     * Update a product (Admin only)
     * @param id
     * @param requestBody
     * @returns any Product updated successfully
     * @throws ApiError
     */
    public static putApiProducts(
        id: string,
        requestBody: UpdateProductDTO,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/products/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Not authorized`,
                403: `Admin access required`,
                404: `Product not found`,
            },
        });
    }
    /**
     * Delete a product (Admin only)
     * @param id
     * @returns any Product deleted successfully
     * @throws ApiError
     */
    public static deleteApiProducts(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/products/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Not authorized`,
                403: `Admin access required`,
                404: `Product not found`,
            },
        });
    }
}
