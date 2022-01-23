import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ItemWrapper } from "./ItemWrapper";
import trashIcon from "../assets/icons/trash/trash.png";
import penIcon from "../assets/icons/trash/pen.png";

import { Task } from "./TasksList";
import Icon from "react-native-vector-icons/Feather";
interface taskProps {
  item: Task;
  index: number;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
  toggleTaskDone: (id: number) => void;
}

export const TaskItem = ({
  item,
  index,
  removeTask,
  toggleTaskDone,
  editTask,
}: taskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskTitle, setEditedTaskTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setEditedTaskTitle(item.title);
    setIsEditing(false);
  }
  function handleSubmitEditing() {
    setIsEditing(true);
    editTask(item.id, editedTaskTitle);
    setIsEditing(false);
  }

  useEffect(() => {
    isEditing ? textInputRef.current?.focus() : textInputRef.current?.blur;
  }, [isEditing]);

  return (
    <ItemWrapper index={index}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            style={item.done ? styles.taskTextDone : styles.taskText}
            value={editedTaskTitle}
            onChangeText={setEditedTaskTitle}
            editable={isEditing}
            ref={textInputRef}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
        {isEditing ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={25} color="#B2B2B2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
            style={{ paddingRight: 20 }}
          >
            <Image source={penIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.iconSeparator}></View>
        <TouchableOpacity
          testID={`trash-${index}`}
          onPress={() => removeTask(item.id)}
          disabled={isEditing}
          style={[
            isEditing ? { opacity: 0.2 } : { opacity: 1 },
            { paddingLeft: 12 },
          ]}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </ItemWrapper>
  );
};

const styles = StyleSheet.create({
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  iconSeparator: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
  },
});
