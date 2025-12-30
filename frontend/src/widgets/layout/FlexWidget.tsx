import { Box, type BoxProps } from "@mui/material";

export function FlexWidget(props: BoxProps) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: ".5rem",
                "& > *": { flex: 1 },
            }}
            {...props}
        />
    );
}

export function FlexEndWidget(props: BoxProps) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: ".5rem",
                "& > *": { flex: "none" },
            }}
            {...props}
        />
    );
}

export function FlexChapterVerseWidget({
    chapter,
    verse,
    ...props
}: BoxProps & { chapter: number; verse: number }) {
    return (
        <Box
            sx={{
                flex: "0",
                paddingTop: ".25rem",
                width: "150px",
                fontSize: ".8rem",
            }}
            {...props}
        >
            {chapter}:{verse}
        </Box>
    );
}
