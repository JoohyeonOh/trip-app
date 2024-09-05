import useEditLike from "@/components/settings/like/hooks/useEditLike";
import FixedBottomButton from "@/components/shared/FixedBottomButton";
import ListRow from "@/components/shared/ListRow";
import { Like } from "@/models/like";
import { useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProps,
  DroppableProps,
  DropResult,
} from "react-beautiful-dnd";

function generateMocks() {
  const mocks = [];

  for (let i = 0; i < 1000; i += 1) {
    mocks.push({
      id: `${i}`,
      hotelId: `hotel ${i}`,
      hotelName: `hotel ${i}`,
      hotelMainImageUrl: `hotel ${i}`,
      userId: "",
      order: i,
    } as Like);
  }

  return mocks;
}

const mocks = generateMocks();

function LikePage() {
  const { data, isEdit, reOrder, save } = useEditLike();
  console.log(isEdit);

  const handleDragAndDrop = (result: DropResult) => {
    if (result.destination == null) {
      return;
    }

    const from = result.source.index;
    const to = result.destination.index;

    reOrder(from, to);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragAndDrop}>
        <StrictModeDroppable droppableId="likes">
          {(droppableProps) => (
            <ul
              ref={droppableProps.innerRef}
              {...droppableProps.droppableProps}
            >
              <Virtuoso
                useWindowScroll
                increaseViewportBy={0}
                itemContent={(index, like) => {
                  return (
                    <Draggable
                      key={like.id}
                      draggableId={like.id}
                      index={index}
                    >
                      {(draggableProps) => (
                        <li
                          ref={draggableProps.innerRef}
                          {...draggableProps.draggableProps}
                          {...draggableProps.dragHandleProps}
                        >
                          <ListRow
                            as="div"
                            contents={
                              <ListRow.Texts
                                title={like.order}
                                subTitle={like.hotelName}
                              />
                            }
                          />
                        </li>
                      )}
                    </Draggable>
                  );
                }}
                data={mocks}
              />
            </ul>
          )}
        </StrictModeDroppable>
      </DragDropContext>

      {isEdit && <FixedBottomButton label="저장하기" onClick={save} />}
    </div>
  );
}

function StrictModeDroppable({ children, ...props }: DroppableProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) return null;

  return <Droppable {...props}>{children}</Droppable>;
}

export default LikePage;
