import { Image } from 'expo-image';
import { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Task, TaskItem } from '@/components/task-item';
import { Brand, Spacing } from '@/constants/theme';


const logo = require('@/assets/images/university-logo.png');

export default function TodoScreen() {
  const insets = useSafeAreaInsets();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [draft, setDraft] = useState('');

  const canAdd = draft.trim().length > 0;

  function addTask() {
    const title = draft.trim();
    if (!title) return;
    setTasks((current) => [...current, { id: Date.now().toString(), title }]);
    closeModal();
  }

  function closeModal() {
    setDraft('');
    setModalVisible(false);
  }

  function deleteTask(id: string) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + Spacing.three }]}>
        <Image source={logo} style={styles.logo} contentFit="contain" />
        <View>
          <Text style={styles.headerTitle}>TO-DO LIST</Text>
          <Text style={styles.headerSubtitle}>
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
          </Text>
        </View>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id}
        renderItem={({ item }) => <TaskItem task={item} onDelete={deleteTask} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>{'Tap "Add Task" to create one.'}</Text>
        }
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 100 }]}
      />

      <Pressable
        onPress={() => setModalVisible(true)}
        style={({ pressed }) => [
          styles.addButton,
          { bottom: insets.bottom + Spacing.four },
          pressed && styles.addButtonPressed,
        ]}>
        <Text style={styles.addButtonText}>+ Add Task</Text>
      </Pressable>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}>
        <KeyboardAvoidingView
          style={styles.backdrop}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>New Task</Text>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="What do you need to do?"
              placeholderTextColor={Brand.textMuted}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={addTask}
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <Pressable
                onPress={closeModal}
                style={({ pressed }) => [styles.cancelButton, pressed && styles.cancelButtonPressed]}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={addTask}
                disabled={!canAdd}
                style={({ pressed }) => [
                  styles.confirmButton,
                  pressed && styles.addButtonPressed,
                  !canAdd && styles.confirmButtonDisabled,
                ]}>
                <Text style={styles.confirmText}>Add</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Brand.cream,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    backgroundColor: Brand.crimson,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.three,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: Brand.cream,
  },
  headerTitle: {
    color: Brand.onCrimson,
    fontSize: 26,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: Brand.onCrimson,
    fontSize: 15,
    opacity: 0.9,
  },
  listContent: {
    padding: Spacing.three,
    flexGrow: 1,
  },
  separator: {
    height: Spacing.two,
  },
  emptyText: {
    marginTop: Spacing.six,
    textAlign: 'center',
    fontSize: 16,
    color: Brand.textMuted,
  },
  addButton: {
    position: 'absolute',
    right: Spacing.four,
    backgroundColor: Brand.crimson,
    borderRadius: 28,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  addButtonPressed: {
    backgroundColor: Brand.crimsonDark,
  },
  addButtonText: {
    color: Brand.onCrimson,
    fontSize: 17,
    fontWeight: '700',
  },
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.four,
    backgroundColor: Brand.backdrop,
  },
  modalCard: {
    backgroundColor: Brand.cream,
    borderRadius: 16,
    borderTopWidth: 6,
    borderTopColor: Brand.crimson,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  modalTitle: {
    color: Brand.crimson,
    fontSize: 22,
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: Brand.crimson,
    borderRadius: 10,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + Spacing.one,
    fontSize: 17,
    color: Brand.text,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.two,
  },
  cancelButton: {
    borderWidth: 1.5,
    borderColor: Brand.crimson,
    borderRadius: 10,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
  },
  cancelButtonPressed: {
    backgroundColor: Brand.creamDark,
  },
  cancelText: {
    color: Brand.crimson,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: Brand.crimson,
    borderRadius: 10,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
  },
  confirmButtonDisabled: {
    opacity: 0.4,
  },
  confirmText: {
    color: Brand.onCrimson,
    fontSize: 16,
    fontWeight: '600',
  },
});
