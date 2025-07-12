package com.example.demolama.web;

import com.example.demolama.model.FoodItem;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/")
@Slf4j
public class ChatController {
    private final ChatClient chatClient;

    public ChatController(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    @GetMapping
    List<FoodItem> findAll() {
        PromptTemplate pt = new PromptTemplate("""
                Return a current list of 5 food items if exists or generate a new list with random values.
                Each object should contain an auto-incremented id field.
                """);
        var prompt = pt.create().augmentSystemMessage("Do not include any explanations or additional text.");

        return this.chatClient.prompt(prompt)
                .advisors(new SimpleLoggerAdvisor())
                .call()
                .entity(new ParameterizedTypeReference<>() {
                });
    }

    @GetMapping("/ai")
    String generation(String userInput) {
        log.info("Input from user: {}", userInput);
        return this.chatClient.prompt()
                .advisors(new SimpleLoggerAdvisor())
                .user(userInput)
                .call()
                .content();
    }


}
