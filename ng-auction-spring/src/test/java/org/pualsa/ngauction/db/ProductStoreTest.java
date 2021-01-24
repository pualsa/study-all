package org.pualsa.ngauction.db;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Optional;

import org.junit.jupiter.api.Test;

class ProductStoreTest {

	@Test
	void test() {
		ProductStore store = new ProductStore();
		Optional<Product> opt = store.getProduct(1L);
		Product product = opt.get();
		assertNotNull(product);
		assertEquals(1, product.getCategories().size());
	}

}
