/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddCartItemDTO } from '../models/AddCartItemDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CartService {
    /**
     * Add item to user cart
     * @param requestBody
     * @returns any Item added to cart successfully
     * @throws ApiError
     */
    public static postApiCart(
        requestBody: AddCartItemDTO,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cart',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation or stock error`,
                401: `Not authorized`,
            },
        });
    }
    /**
     * Get current user cart
     * @returns any Cart fetched successfully
     * @throws ApiError
     */
    public static getApiCart(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cart',
            errors: {
                401: `Not authorized`,
            },
        });
    }
}
