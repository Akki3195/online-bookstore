package com.bookstore.resource;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.bookstore.domain.Book;
import com.bookstore.service.BookService;

@RestController
@RequestMapping("/book")
public class BookResource {
	@Autowired
	private BookService bookService;
	
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public Book addBookPost(@RequestBody Book book) {
		return bookService.save(book);
	}
	
	@RequestMapping(value = "/add/image",method = RequestMethod.POST)
	public ResponseEntity<String> upload(
			@RequestParam("id") Long id,
			HttpServletRequest request,HttpServletResponse respones
			) {
		try {
			Optional<Book> book = bookService.findOne(id);
			
			if(book != null) {
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
			Iterator<String> it = multipartRequest.getFileNames();
			MultipartFile multipartFile = multipartRequest.getFile(it.next());
			String fileName = id+".png";
			
			byte[]  bytes= multipartFile.getBytes();
			BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File("src/main/resources/static/image/book/"+fileName)));
			stream.write(bytes);
			stream.close();
			
			return new ResponseEntity<String>("upload success",HttpStatus.OK);
			}
			else
				return new ResponseEntity<String>("Record not found",HttpStatus.BAD_REQUEST);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("Upload failed",HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value="/bookList",method = RequestMethod.GET)
	public List<Book> getBookList(){
		return bookService.findAll();
	}
	
	@RequestMapping(value="/{id}",method = RequestMethod.GET)
	public Optional<Book> getBook(@PathVariable("id") Long id){
		Optional<Book> book= bookService.findOne(id);
		return book;
	}
	
	@RequestMapping(value="/update",method = RequestMethod.POST)
	public Book updateBook(@RequestBody Book book){
		return bookService.save(book);
	}
	
	@RequestMapping(value="/remove",method = RequestMethod.POST)
	public ResponseEntity<String> remove(@RequestBody long bookId) throws IOException {
		if (bookService.removeOne(bookId)) {
			String fileName = bookId+".png";
			/* Files.delete(Path.of("src/main/resources/static/image/book/"+fileName)); */
			Files.delete(Paths.get("src/main/resources/static/image/book/"+fileName));
			return new ResponseEntity<String>("deleted", HttpStatus.OK);
		} else
			return new ResponseEntity<String>("error occured", HttpStatus.FAILED_DEPENDENCY);
	}
	
	@RequestMapping(value="/searchBook",method = RequestMethod.POST)
	public List<Book> searchBook(@RequestBody String keyword){
		List<Book> bookList = bookService.blurrysearch(keyword);
		return bookList;
	}
}

