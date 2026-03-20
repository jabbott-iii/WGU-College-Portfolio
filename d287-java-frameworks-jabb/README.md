## d287-java-frameworks

C.  Customize the HTML user interface for your customer’s application. The user interface should include the shop name, the product names, and the names of the parts.
     1. mainscreen.html line 14 updated shop name title
     2. mainscreen.html line 19 updated shop name header
     3. mainscreen.html line 21 updated part to Computer Parts
     4. mainscreen.html line 53 updated product to Assembled Computer Products

D.  Add an “About” page to the application to describe your chosen customer’s company to web viewers and include navigation to and from the “About” page and the main screen.
      1. about.html created file
      2. about.html line 4 added <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      3. about.html line 6 updated about title
      4. about.html line 9 updated about header to store name
      5. about.html line 11 and 12 updated about paragraph
      6. about.html line 14 and 15 updated ref link to main screen
      7. AboutController.java created file
      8. AboutController.java line 5 added @controller annotation
      9. AboutController.java line 9 added @GetMapping annotation
      10. AboutController.java line 10 and 11 added return about.html
      11. mainscreen.html line 21 updated ref link to about page

E.  Add a sample inventory appropriate for your chosen store to the application. You should have five parts and five products in your sample inventory and should not overwrite existing data in the database.
      1. BootStrapData.java lines 63 - 72 added products and product repository information for 5 products
      2. BootStrapData.java lines 74 - 83 added parts and part repository information for 5 products

F.  Add a “Buy Now” button to your product list. Your “Buy Now” button must meet each of the following parameters:
•  The “Buy Now” button must be next to the buttons that update and delete products.
• The button should decrement the inventory of that product by one. It should not affect the inventory of any of the associated parts.
•  Display a message that indicates the success or failure of a purchase.
      1. mainscreen.html line 85 added buy button
      2. BuyProduct.java line 11 added @Controller annotation
      3. BuyProduct.java line 14 - 15 added @Autowired annotation for ProductRepository
      4. BuyProduct.java line 17 - 18 added Optional<Product> product = productRepository.findById(id); and @RequestParam("id") Long id;
      5. BuyProduct.java line 19 - 22 added statement to check if product is not null and decrement inventory
      6. BuyProduct.java line 23 added return /buysuccess.html
      7. BuyProduct.java line 25 added return /buyerror.html
      8. BuyProduct.java line 28 added return /buyerror.html
      9. buysuccess.html created file
      10. buyerror.html created file
      11. buyerror.html line 4 added <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      12. buyerror.html line 5 added <title>Buy Error</title>
      13. buyerror.html line 8 added failure message
      14. buyerror.html line 9 added return to main screen link
      15. buysuccess.html line 4 added <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
       16. buysuccess.html line 5 added <title>Buy Success</title>
       17. buysuccess.html line 8 added success message
       18. buysuccess.html line 9 added return to main screen link
       19. BuyProduct.java line 18 added @GetMapping("/buyProduct")


G.  Modify the parts to track maximum and minimum inventory by doing the following:
•  Add additional fields to the part entity for maximum and minimum inventory.
•  Modify the sample inventory to include the maximum and minimum fields.
•  Add to the InhousePartForm and OutsourcedPartForm forms additional text inputs for the inventory so the user can set the maximum and minimum values.
•  Rename the file the persistent storage is saved to.
•  Modify the code to enforce that the inventory is between or at the minimum and maximum value.
    1. Part.java lines 31 - 34 created @min annotations and entities for max and min inv.
    2. Part.java line 44 added maxInv and minInv.
    3. Part.java lines 48 - 49 added maxInv and minInv integer fields.
    4. BootStrapData.java lines 74 - 78 added maxInv and minInv to sample parts.
    5. Part.java lines 99 - 113 added get and set methods for maxInv and minInv.
    6. InhousePartForm.java lines 24 - 28 added maxInv and minInv form input fields.
    7. InhousePartRepository.java lines 17 - 18 created query annotation.
    8. OutsourcedPartRepository.java lines 17 - 18 created query annotation.
    9. mainscreen.html lines 40 - 41 and 50 - 51 added table structure for max and min inventory.
    10. OutsourcedPartForm.html lines 25 - 29 added maxInv and minInv form input fields.
    11. InhousePartForm.html lines 17 - 18, 21 - 22, 25 - 26, 29 - 30, 33 - 34 added headers to make the fields more readable.
    12. OutsourcedPartForm.html lines 16 - 17, 19 - 20, 23 - 24, 27 - 28, 31 - 32, 35 - 36 added headers to make the fields more readable.
    13. application.properties line 6 changed the database file name to vigordb
    14. Part.java lines 116 to 117 created boolean value for maxInv and minInv range.
    15. AddInhousePartController.java lines 43 - 45 added logic to check if inv is within the maxInv and minInv range.
    16. AddOutsourcedPartController.java lines 43 - 45 added logic to check if inv is within the maxInv and minInv range.

H.  Add validation for between or at the maximum and minimum fields. The validation must include the following:
•  Display error messages for low inventory when adding and updating parts if the inventory is less than the minimum number of parts.
•  Display error messages for low inventory when adding and updating products lowers the part inventory below the minimum.
•  Display error messages when adding and updating parts if the inventory is greater than the maximum.
    1. part.java lines 119 to 121 created boolean method for low inventory.
    2. AddInhousePartController.java lines 46 - 48 added logic to check if inv is below the minInv range.
    3. AddOutsourcedPartController.java lines 46 - 48 added logic to check if inv is below the minInv range.
    4. InhousePart.java lines 19 - 25 created field parameters for InhousePart() to match Part().
    5. BootStrapData.java line 32 added private final InhousePartRepository inhousePartRepository.
    6. BootStrapData.java line 35 added InhousePartRepository inhousePartRepository.
    7. BootStrapData.java line 39 added this.inhousePartRepository = inhousePartRepository.
    8. BootStrapData.java lines 77 - 86 replaced all instances of Part with InhousePart and all instances of partRepository with inhousePartRepository.
    9. Part.java lines 123 - 125 created boolean method for high inventory.
    10. AddInhousePartController.java lines 49 - 51 added logic to check if inv is above the maxInv range.
    11. AddOutsourcedPartController.java lines 49 - 51 added logic to check if inv is above the maxInv range.

I.  Add at least two unit tests for the maximum and minimum fields to the PartTest class in the test package.
    1. PartTest.java lines 162 - 177 added tests for maxInv and minInv.

J.  Remove the class files for any unused validators in order to clean your code.
    1. Removed DeletePartValidator.java due to it being unused.


