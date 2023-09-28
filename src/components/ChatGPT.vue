<template>
  <div class="chat-container">
    <!-- Query Input -->
    <div class="input-container">
      <input
        v-model="userMessage"
        @keyup.enter="sendMessage"
        class="input-field"
        placeholder="Type your message..."
      />
      <button @click="sendMessage" class="send-button">Send</button>
    </div>

    <!-- Response Display -->
    <div class="response-container">
      <div
        v-for="message in messages"
        :key="message.id"
        class="message"
        :class="{ 'user-message': message.role === 'user', 'assistant-message': message.role === 'assistant' }"
      >
        {{ message.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      userMessage: '',
    };
  },
  methods: {
    async sendMessage() {
      if (!this.userMessage) return;

      try {
        const response = await this.$axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: this.userMessage },
          ],
        });

        const botMessage = response.data.choices[0].message.content;

        this.messages.push({ id: Date.now(), text: this.userMessage, role: 'user' });
        this.messages.push({ id: Date.now() + 1, text: botMessage, role: 'assistant' });

        this.userMessage = ''; // Clear input box
      } catch (error) {
        console.error('Error sending message:', error);
      }
    },
  },
};
</script>

<style scoped>
.chat-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.input-container {
  display: flex;
  align-items: center;
}

.input-field {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

.send-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.response-container {
  margin-top: 20px;
}

.message {
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  word-wrap: break-word;
}
.user-message {
  background-color: #007bff;
  color: #fff;
  align-self: flex-end;
}

.assistant-message {
  background-color: #f0f0f0;
  color: #000;
}
</style>
