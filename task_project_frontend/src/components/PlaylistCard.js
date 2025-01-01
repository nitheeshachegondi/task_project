import React from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  CARD: "card",
};

const PlaylistCard = ({ playlist, index, moveCard }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      // Get bounding rectangle of the target
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Find vertical middle of the target
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Get mouse position
      const clientOffset = monitor.getClientOffset();
      // Calculate pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Perform the move only when the mouse crosses half of the card height
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      // Trigger moveCard function and update indexes
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { type: ItemTypes.CARD, id: playlist.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="playlist-card"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <img
        src={playlist.snippet.thumbnails.default.url}
        alt={playlist.snippet.title}
      />
      <h3>{playlist.snippet.title}</h3>
    </div>
  );
};

export default PlaylistCard;
