package com.coconutmusic.entity;

public enum MusicType {
    NEW_MUSIC("new-music"),
    TRENDING("trending"),
    TOP_VIEW("top-view"),
    VN_LOFI("vn-lofi"),
    FAVORITE("favorite");

    private final String value;

    MusicType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static MusicType fromValue(String value) {
        for (MusicType type : MusicType.values()) {
            if (type.value.equals(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Unknown music type: " + value);
    }
}
