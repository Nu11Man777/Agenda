package com.electric.schneider.backend.api.response;

public record SuccessResponse<T>(boolean success, String message, T data) {

	public static <T> SuccessResponse<T> ok(String message, T data) {
		return new SuccessResponse<>(true, message, data);
	}
}
