import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Brand, Spacing } from '@/constants/theme';

export type Task = {
  id: string;
  title: string;
};

type TaskItemProps = {
  task: Task;
  onDelete: (id: string) => void;
};

export function TaskItem({ task, onDelete }: TaskItemProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{task.title}</Text>
      <Pressable
        onPress={() => onDelete(task.id)}
        hitSlop={8}
        style={({ pressed }) => [styles.deleteButton, pressed && styles.deleteButtonPressed]}>
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Brand.creamDark,
    borderLeftWidth: 6,
    borderLeftColor: Brand.crimson,
    borderRadius: 12,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
  },
  title: {
    flex: 1,
    fontSize: 17,
    color: Brand.text,
  },
  deleteButton: {
    backgroundColor: Brand.crimson,
    borderRadius: 8,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  deleteButtonPressed: {
    backgroundColor: Brand.crimsonDark,
  },
  deleteText: {
    color: Brand.onCrimson,
    fontWeight: '600',
  },
});
