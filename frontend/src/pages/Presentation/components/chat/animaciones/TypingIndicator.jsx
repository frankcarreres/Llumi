import { Box } from "@mui/material";

function TypingIndicator() {
  return (
    <Box
      sx={{
        alignSelf: "flex-start",
        background: "linear-gradient(to right, rgba(255, 210, 133, 0.7), rgba(254, 179, 77, 0.7))",
        borderRadius: 3,
        px: 2,
        py: 1,
        maxWidth: "70%",
        mb: 1,
        display: "flex",
        gap: 1,
      }}
    >
      {[1, 2, 3].map((_, i) => (
        <Box
          key={i}
          sx={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: "#4b4945",
            animation: `typing 1.2s infinite ease-in-out ${i * 0.2}s`,
            "@keyframes typing": {
              "0%, 80%, 100%": { transform: "translateY(0)" },
              "40%": { transform: "translateY(-6px)" },
            },
          }}
        />
      ))}
    </Box>
  );
}

export default TypingIndicator;
