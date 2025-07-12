package com.example.demochat;

import java.util.ArrayList;
import java.util.List;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ChatController {
  private final ChatClient chatClient;
  private final List<String> chatHistory = new ArrayList<>();

  public ChatController(ChatClient.Builder chatClientBuilder) {
    this.chatClient = chatClientBuilder.defaultTools(new ShoppingList()).build();
  }

  @GetMapping("/")
  public String showForm(Model model) {
    model.addAttribute("chatHistory", chatHistory);
    return "chatForm";
  }

  @PostMapping("/submit")
  public String handleUserInput(@RequestParam("userText") String userText, Model model) {
    if (userText == null || userText.trim().isEmpty()) {
      model.addAttribute("error", "Input cannot be empty");
      return "chatForm";
    }

    String response =
        this.chatClient
            .prompt()
            .advisors(new SimpleLoggerAdvisor())
            .user(userText)
            .call()
            .content();

    chatHistory.add("User: " + userText);
    chatHistory.add("Bot: " + response);
    model.addAttribute("chatHistory", chatHistory);
    return "chatForm";
  }

  @PostMapping("/clear")
  public String clearChatHistory(Model model) {
    chatHistory.clear();
    model.addAttribute("chatHistory", chatHistory);
    return "chatForm";
  }
}
