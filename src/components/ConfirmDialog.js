import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import Button from './Button';
import { colors, radius, space, type } from '../theme';

// Dialog pengesahan padam (Delete) — ikut komponen Dialog di Figma
export default function ConfirmDialog({
  visible,
  title,
  message,
  onCancel,
  onConfirm,
  confirming = false,
  confirmLabel = 'Padam',
  confirmingLabel = 'Memadam...',
}) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={type.h3}>{title}</Text>
          <Text style={type.body}>{message}</Text>
          <View style={styles.actions}>
            <Button label="Batal" variant="secondary" onPress={onCancel} disabled={confirming} style={{ flex: 1 }} />
            <Button
              label={confirming ? confirmingLabel : confirmLabel}
              variant="danger"
              onPress={onConfirm}
              loading={confirming}
              style={{ flex: 1 }}
              testID="confirm-delete"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(28,25,23,0.5)', alignItems: 'center', justifyContent: 'center', padding: space.xl },
  dialog: {
    width: '100%', maxWidth: 320, backgroundColor: colors.surface, borderRadius: radius.lg, padding: space.xl, gap: space.lg,
    shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 8,
  },
  actions: { flexDirection: 'row', gap: space.sm },
});
