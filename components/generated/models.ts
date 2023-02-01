// Code generated by wunderctl. DO NOT EDIT.

import type function_UsersGet from "../../.wundergraph/operations/users/get";
import type function_UsersSubscribe from "../../.wundergraph/operations/users/subscribe";
import type function_UsersUpdate from "../../.wundergraph/operations/users/update";
import type { ExtractInput, ExtractResponse } from "@wundergraph/sdk/operations";

export type JSONValue = string | number | boolean | JSONObject | Array<JSONValue>;

export type JSONObject = { [key: string]: JSONValue };

export interface GraphQLError {
	message: string;
	path?: ReadonlyArray<string | number>;
}

export interface CoverArtByQueryInput {
	luceneQueryString: string;
}

export type UsersGetInput = ExtractInput<typeof function_UsersGet>;

export type UsersSubscribeInput = ExtractInput<typeof function_UsersSubscribe>;

export type UsersUpdateInput = ExtractInput<typeof function_UsersUpdate>;

export interface InternalCoverArtByQueryInput {
	luceneQueryString: string;
}

export interface InjectedCoverArtByQueryInput {
	luceneQueryString: string;
}

export interface CoverArtByQueryResponse {
	data?: CoverArtByQueryResponseData;
	errors?: ReadonlyArray<GraphQLError>;
}

export interface UsersGetResponse {
	data?: UsersGetResponseData;
	errors?: ReadonlyArray<GraphQLError>;
}

export interface UsersSubscribeResponse {
	data?: UsersSubscribeResponseData;
	errors?: ReadonlyArray<GraphQLError>;
}

export interface UsersUpdateResponse {
	data?: UsersUpdateResponseData;
	errors?: ReadonlyArray<GraphQLError>;
}

export interface CoverArtByQueryResponseData {
	graphbrainz_search?: {
		releases?: {
			edges?: {
				node?: {
					coverArtArchive?: {
						front?: string;
					};
				};
			}[];
		};
	};
}

export type UsersGetResponseData = ExtractResponse<typeof function_UsersGet>;

export type UsersSubscribeResponseData = ExtractResponse<typeof function_UsersSubscribe>;

export type UsersUpdateResponseData = ExtractResponse<typeof function_UsersUpdate>;
