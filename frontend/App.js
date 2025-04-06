import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Linking } from 'react-native';
import { REACT_APP_API_URL } from '@env';

export default function App() {
  const [hours, setHours] = useState('');

  const submitHours = async () => {
    console.log('API URL:', REACT_APP_API_URL);
    try {
      const response = await fetch(`${REACT_APP_API_URL}/api/overtime`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hours: parseFloat(hours) }),
      });
      const data = await response.json();
      alert(`送信成功！残業時間: ${data.hours}時間`);
    } catch (error) {
      alert('送信失敗: ' + error.message);
    }
  };

  const startPayment = async () => {
    console.log('Payment URL:', `${REACT_APP_API_URL}/create-checkout-session`);
    try {
      const response = await fetch(`${REACT_APP_API_URL}/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Response Status:', response.status);
      const data = await response.json();
      console.log('Response Data:', data);
      if (!data.url) {
        throw new Error('Checkout URLがありません: ' + (data.error || '不明なエラー'));
      }
      console.log('Checkout URL:', data.url);
      Linking.openURL(data.url);
    } catch (error) {
      console.log('Error:', error.message);
      alert('決済エラー: ' + error.message);
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
      <Button title="課金する" onPress={startPayment} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  input: { borderWidth: 1, width: 200, padding: 10, margin: 10 }
});