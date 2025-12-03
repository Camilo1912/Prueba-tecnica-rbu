import { authenticatedFetch } from "./apiClient";
import type { TestConnectionResponse } from "@/custom-types.d";

export const testConnection = async (): Promise<TestConnectionResponse> => {
    return authenticatedFetch("/test-connection", {
        method: 'GET'
    });
}
