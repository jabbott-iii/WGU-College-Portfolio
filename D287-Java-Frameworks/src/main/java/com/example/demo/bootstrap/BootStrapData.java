package com.example.demo.bootstrap;

import com.example.demo.domain.InhousePart;
import com.example.demo.domain.OutsourcedPart;
import com.example.demo.domain.Part;
import com.example.demo.domain.Product;
import com.example.demo.repositories.InhousePartRepository;
import com.example.demo.repositories.OutsourcedPartRepository;
import com.example.demo.repositories.PartRepository;
import com.example.demo.repositories.ProductRepository;
import com.example.demo.service.OutsourcedPartService;
import com.example.demo.service.OutsourcedPartServiceImpl;
import com.example.demo.service.ProductService;
import com.example.demo.service.ProductServiceImpl;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

/**
 *
 *
 *
 *
 */
@Component
public class BootStrapData implements CommandLineRunner {

    private final PartRepository partRepository;
    private final ProductRepository productRepository;
    private final InhousePartRepository inhousePartRepository;
    private final OutsourcedPartRepository outsourcedPartRepository;

    public BootStrapData(PartRepository partRepository, ProductRepository productRepository, OutsourcedPartRepository outsourcedPartRepository, InhousePartRepository inhousePartRepository) {
        this.partRepository = partRepository;
        this.productRepository = productRepository;
        this.outsourcedPartRepository = outsourcedPartRepository;
        this.inhousePartRepository = inhousePartRepository;
    }

    @Override
    public void run(String... args) throws Exception {

       /*
        OutsourcedPart o= new OutsourcedPart();
        o.setCompanyName("Western Governors University");
        o.setName("out test");
        o.setInv(5);
        o.setPrice(20.0);
        o.setId(100L);
        outsourcedPartRepository.save(o);
        OutsourcedPart thePart=null;
        List<OutsourcedPart> outsourcedParts=(List<OutsourcedPart>) outsourcedPartRepository.findAll();
        for(OutsourcedPart part:outsourcedParts){
            if(part.getName().equals("out test"))thePart=part;
        }
        System.out.println(thePart.getCompanyName());
        */

        List<OutsourcedPart> outsourcedParts=(List<OutsourcedPart>) outsourcedPartRepository.findAll();
        for(OutsourcedPart part:outsourcedParts){
            System.out.println(part.getName()+" "+part.getCompanyName());
        }

        Product laptop= new Product("laptop",1200.0,15);
        Product desktop= new Product("desktop",1000.0,15);
        Product phone= new Product("phone",500.0,15);
        Product tablet= new Product("tablet",200.0,15);
        Product microcomputer= new Product("microcomputer",250.0,15);
        productRepository.save(laptop);
        productRepository.save(desktop);
        productRepository.save(phone);
        productRepository.save(tablet);
        productRepository.save(microcomputer);

        InhousePart cpu= new InhousePart("cpu",150.0,15, 1, 50);
        InhousePart motherboard= new InhousePart("motherboard",100.0,15, 1, 50);
        InhousePart screen= new InhousePart("screen",40.0,15, 1, 50);
        InhousePart ssd= new InhousePart("ssd",70.0,15, 1, 50);
        InhousePart ram= new InhousePart("ram",300.0,15, 1, 50);
        inhousePartRepository.save(cpu);
        inhousePartRepository.save(motherboard);
        inhousePartRepository.save(screen);
        inhousePartRepository.save(ssd);
        inhousePartRepository.save(ram);

        System.out.println("Started in Bootstrap");
        System.out.println("Number of Products"+productRepository.count());
        System.out.println(productRepository.findAll());
        System.out.println("Number of Parts"+partRepository.count());
        System.out.println(partRepository.findAll());

    }
}
