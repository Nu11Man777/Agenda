package com.electric.schneider.backend.api.response;

public record ErrorResponse(String message, int status, String error) {
}
