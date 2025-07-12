package com.example.demomcp;

import com.example.demomcp.shopping.ShoppingCart;
import io.modelcontextprotocol.server.McpServerFeatures;
import io.modelcontextprotocol.spec.McpSchema;
import org.springframework.ai.support.ToolCallbacks;
import org.springframework.ai.tool.ToolCallback;
import org.springframework.ai.tool.ToolCallbackProvider;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class DemomcpApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemomcpApplication.class, args);
    }

    // This bean exposes our ShoppingCart tools to the MCP framework
    @Bean
    public ToolCallbackProvider shoppingCartTools(ShoppingCart shoppingCart) {
        List<ToolCallback> tools = List.of(ToolCallbacks.from(shoppingCart));
        return ToolCallbackProvider.from(tools);
    }
    /* also works, but ToolCallbackProvider is more flexible
    @Bean
    public List<ToolCallback> shoppingCartTools(ShoppingCart shoppingCart) {
        return List.of(ToolCallbacks.from(shoppingCart));
    }
     */

    // Prompts are not supported by the Claude Desktop
    @Bean
    public List<McpServerFeatures.SyncPromptSpecification> myPrompts() {
        var prompt = new McpSchema.Prompt("greeting", "A friendly greeting prompt",
                List.of(new McpSchema.PromptArgument("name", "The name to greet", true)));

        var promptSpecification = new McpServerFeatures.SyncPromptSpecification(prompt, (exchange, getPromptRequest) -> {
            String nameArgument = (String) getPromptRequest.arguments().get("name");
            if (nameArgument == null) {
                nameArgument = "friend";
            }
            var userMessage = new McpSchema.PromptMessage(McpSchema.Role.USER, new McpSchema.TextContent("Hello " + nameArgument + "! How can I assist you today?"));
            return new McpSchema.GetPromptResult("A personalized greeting message", List.of(userMessage));
        });

        return List.of(promptSpecification);
    }
}
