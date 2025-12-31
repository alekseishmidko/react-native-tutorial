import StyledButton from "@/components/StyledButton";
import StyledCheckbox from "@/components/StyledCheckbox";
import StyledText from "@/components/StyledText";
import { COLORS } from "@/constants/ui";
import { Todo } from "@/types/todo";
import { useState } from "react";
import { StyleSheet, Vibration, View } from "react-native";
import EditTodoModal from "@/layout/modals/edit-todo-modal";
import DeleteTodoModal from "@/layout/modals/delete-todo-modal";


type TodoItemProps = Todo & {
    onCheck: (id: Todo["id"]) => void;
    onDelete: (id: Todo["id"]) => void;
    onUpdateTitle: (id: Todo["id"], title: Todo["title"]) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({
                                               id,
                                               title,
                                               isCompleted,
                                               onCheck,
                                               onDelete,
                                               onUpdateTitle,
                                           }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const onPressEdit = () => {
        setIsEditModalOpen(true);
    };

    const onPressDelete = () => {
        setIsDeleteModalOpen(true);
    };

    const onConfirmDelete = () => {
        onDelete(id);
        Vibration.vibrate(50);
    };

    const onPressCheck = () => {
        onCheck(id);
    };

    return (
        <View style={[styles.container]}>
            <View style={styles.checkTitleContainer}>
                <StyledCheckbox checked={isCompleted} onCheck={onPressCheck} />
                <StyledText
                    style={[
                        { textDecorationLine: isCompleted ? "line-through" : "none" },
                    ]}
                >
                    {title}
                </StyledText>
            </View>
            <View style={styles.controlsContainer}>
                <StyledButton icon="pencil" size="small" onPress={onPressEdit} />
                <EditTodoModal
                    title={title}
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={(title) => onUpdateTitle(id, title)}
                />
                <StyledButton
                    icon="trash"
                    size="small"
                    variant="delete"
                    onPress={onPressDelete}
                />
                <DeleteTodoModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onDelete={onConfirmDelete} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-between",
        padding: 15,
        marginVertical: 8,
        backgroundColor: COLORS.SECONDARY_BACKGROUND,
    },
    checkTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    controlsContainer: {
        flexDirection: "row",
        gap: 5,
    },
});

export default TodoItem;