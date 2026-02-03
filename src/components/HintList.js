// src/components/HintList.js
export default function HintList({ items }) {
    return (
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.text}
          </li>
        ))}
      </ul>
    );
  }
  