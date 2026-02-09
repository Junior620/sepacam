
export function StudioLogo(props: any) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem" }}>
            <div style={{
                width: "24px",
                height: "24px",
                backgroundColor: "#1B5E3B",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "12px"
            }}>
                S
            </div>
            <span style={{ color: "#1B5E3B", fontWeight: "bold", fontFamily: "system-ui" }}>
                SEPACAM
            </span>
            {/* Default title rendered by Sanity */}
            {/* {props.renderDefault(props)} */}
        </div>
    );
}
