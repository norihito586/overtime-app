import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  const [hours, setHours] = useState('');

  const submitHours = async () => {
    console.log('送信ボタンを押しました'); // ボタン押したことを確認
    console.log('入力値:', hours); // 入力した値が見える
    try {
      const response = await fetch('http://192.168.3.9:3000/api/overtime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hours: parseFloat(hours) }),
      });
      console.log('バックエンドからのレスポンス:', response.status); // 通信の結果
      const data = await response.json();
      console.log('データ:', data); // バックエンドが返した内容
      alert(`送信成功！残業時間: ${data.hours}時間`);
    } catch (error) {
      console.log('エラー:', error.message); // エラーの詳細
      alert('送信失敗: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>超過勤務時間を入力</Text>
      <TextInput
        style={styles.input}
        value={hours}
        onChangeText={setHours}
        keyboardType="numeric"
        placeholder="例: 2.5"
      />
      <Button title="送信" onPress={submitHours} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  input: { borderWidth: 1, width: 200, padding: 10, margin: 10 }
});