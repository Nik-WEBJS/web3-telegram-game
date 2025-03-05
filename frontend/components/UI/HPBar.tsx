import { useEffect, useState } from "react";

interface HPBarProps {
  hp: number;
  maxHp: number;
}

const HPBar = ({ hp, maxHp }: HPBarProps) => {
  const [width, setWidth] = useState((hp / maxHp) * 100);

  useEffect(() => {
    const animation = requestAnimationFrame(() => {
      setWidth((hp / maxHp) * 100);
    });

    return () => cancelAnimationFrame(animation);
  }, [hp, maxHp]);

  const getColor = () => {
    if (width > 50) return "green";
    if (width > 20) return "yellow";
    return "red";
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.bar,
          width: `${width}%`,
          background: getColor(),
        }}
      />
    </div>
  );
};

const styles = {
  container: {
    width: "200px",
    height: "20px",
    background: "#444",
    borderRadius: "5px",
    overflow: "hidden",
    border: "2px solid #222",
  },
  bar: {
    height: "100%",
    transition: "width 0.3s ease-in-out",
  },
};

export default HPBar;
