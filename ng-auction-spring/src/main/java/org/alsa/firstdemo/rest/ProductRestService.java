package org.alsa.firstdemo.rest;

import java.util.Collection;

import org.alsa.firstdemo.db.Product;
import org.alsa.firstdemo.db.ProductStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductRestService {

	@Autowired
	private ProductStore store;

	@GetMapping("/products/{id}")
	public Product getProduct(@PathVariable long id) {
		return store.getProduct(id).orElseThrow();
	}

	@GetMapping("/products")
	public Collection<Product> findProducts(ProductSearchParams searchParams) {
		return store.findProducts(searchParams);
	}

	@GetMapping("/categories")
	public Collection getCategories() {
		return store.getCategories();
	}

	@GetMapping("/categories/{category}")
	public Collection<Product> getProductsByCategory(@PathVariable String category) {
		return store.getProductsByCategory(category);
	}
}
