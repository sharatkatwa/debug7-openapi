/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface RegisterDTO {
  /** @example "John Doe" */
  name: string;
  /** @example "john@example.com" */
  email: string;
  /** @example "password123" */
  password: string;
}

export interface LoginDTO {
  /** @example "john@example.com" */
  email: string;
  /** @example "password123" */
  password: string;
}

export interface CreateProductDTO {
  /** @example "Wireless Headphones" */
  name: string;
  /** @example "Noise cancelling headphones" */
  description?: string;
  /** @example 199.99 */
  price: number;
  /** @example "Electronics" */
  category: string;
  /** @example 50 */
  stock?: number;
  /** @example "https://example.com/item.jpg" */
  imageUrl?: string;
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
  imageUrl?: string;
}

export interface AddCartItemDTO {
  /** @example "64f1a2b3c4d5e6f7a8b9c0d1" */
  productId: string;
  /** @example 2 */
  quantity: number;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://localhost:4000",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title E-Commerce API
 * @version 1.0.0
 * @baseUrl http://localhost:4000
 *
 * E-commerce backend API documentation generated from route annotations
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Auth
     * @name UsersRegisterCreate
     * @summary Register a new user
     * @request POST:/api/users/register
     */
    usersRegisterCreate: (data: RegisterDTO, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/users/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name UsersLoginCreate
     * @summary Log in user
     * @request POST:/api/users/login
     */
    usersLoginCreate: (data: LoginDTO, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/users/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name UsersRefreshTokenCreate
     * @summary Refresh access token
     * @request POST:/api/users/refresh-token
     */
    usersRefreshTokenCreate: (
      data?: {
        refreshToken?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/users/refresh-token`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name UsersLogoutCreate
     * @summary Log out user and revoke refresh token
     * @request POST:/api/users/logout
     */
    usersLogoutCreate: (
      data?: {
        refreshToken?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/users/logout`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsList
     * @summary List all products with optional filtering
     * @request GET:/api/products
     */
    productsList: (
      query?: {
        /** Filter by category */
        category?: string;
        /** Search by name/description keyword */
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/products`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsCreate
     * @summary Create a product (Admin only)
     * @request POST:/api/products
     * @secure
     */
    productsCreate: (data: CreateProductDTO, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/products`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsDetail
     * @summary Get product by ID
     * @request GET:/api/products/{id}
     */
    productsDetail: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/products/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsUpdate
     * @summary Update a product (Admin only)
     * @request PUT:/api/products/{id}
     * @secure
     */
    productsUpdate: (
      id: string,
      data: UpdateProductDTO,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/products/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsDelete
     * @summary Delete a product (Admin only)
     * @request DELETE:/api/products/{id}
     * @secure
     */
    productsDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/products/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrdersCreate
     * @summary Place an order from the current cart
     * @request POST:/api/orders
     * @secure
     */
    ordersCreate: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/orders`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrdersList
     * @summary Get order history for current user
     * @request GET:/api/orders
     * @secure
     */
    ordersList: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/orders`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cart
     * @name CartCreate
     * @summary Add item to user cart
     * @request POST:/api/cart
     * @secure
     */
    cartCreate: (data: AddCartItemDTO, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/cart`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cart
     * @name CartList
     * @summary Get current user cart
     * @request GET:/api/cart
     * @secure
     */
    cartList: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/cart`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
}
