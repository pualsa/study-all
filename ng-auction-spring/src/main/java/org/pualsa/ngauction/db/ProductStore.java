package org.pualsa.ngauction.db;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.pualsa.ngauction.rest.ProductSearchParams;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;

@Component
public class ProductStore {

	private final Map<Long, Product> products;

	public ProductStore() {
		products = new HashMap<>();
		loadProducts();
	}

	private void loadProducts() {
		try (InputStream inp = getClass().getClassLoader().getResourceAsStream("db/products.json")) {
			ObjectMapper mapper = new ObjectMapper();
			CollectionType javaType = mapper.getTypeFactory().constructCollectionType(List.class, Product.class);
			List<Product> list = mapper.readValue(inp, javaType);
			for (Product product : list) {
				products.put(product.getId(), product);
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public Optional<Product> getProduct(long id) {
		return Optional.ofNullable(products.get(id));
	}

	public Collection<Product> getAllProducts() {
		return products.values();
	}

	public Collection<Product> getProductsByCategory(String category) {
		return products.values().stream()//
				.filter(p -> p.getCategories().contains(category))//
				.collect(Collectors.toList());
	}

	public Collection<String> getCategories() {
		return products.values().stream()//
				.map(Product::getCategories)//
				.flatMap(Collection::stream)//
				.collect(Collectors.toSet());
	}

	public Collection<Product> findProducts(ProductSearchParams params) {
		if (params == null) {
			return getAllProducts();
		}
		String title = params.getTitle().toLowerCase();
		return products.values().stream()//
				.filter(p -> p.getTitle().toLowerCase().contains(title))//
				.filter(p -> p.getPrice() >= params.getMinPrice() && p.getPrice() <= params.getMaxPrice())//
				.collect(Collectors.toList());
	}

	public double updatePrice(long productId, double price) {
		Product product = products.get(productId);
		if (price > product.getPrice()) {
			product.setPrice(price);
		}
		return product.getPrice();
	}
}
