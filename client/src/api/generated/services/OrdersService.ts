/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrdersService {
    /**
     * Place an order from the current cart
     * @returns any Order placed successfully
     * @throws ApiError
     */
    public static postApiOrders(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/orders',
            errors: {
                400: `Cart empty or insufficient stock`,
                401: `Not authorized`,
            },
        });
    }
    /**
     * Get order history for current user
     * @returns any Order history fetched successfully
     * @throws ApiError
     */
    public static getApiOrders(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orders',
            errors: {
                401: `Not authorized`,
            },
        });
    }
}
