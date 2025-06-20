package com.coconutmusic.config;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class SampleMusicResponse {
    @JsonProperty("message")
    private String message;

    @JsonProperty("success")
    private Boolean success;

    @JsonProperty("data")
    private List<SampleMusic> data;

    // Getters and Setters
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Boolean getSuccess() { return success; }
    public void setSuccess(Boolean success) { this.success = success; }

    public List<SampleMusic> getData() { return data; }
    public void setData(List<SampleMusic> data) { this.data = data; }
}
