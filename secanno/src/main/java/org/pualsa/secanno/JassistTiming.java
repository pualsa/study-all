package org.pualsa.secanno;

import java.io.IOException;
import javassist.CannotCompileException;
import javassist.ClassPool;
import javassist.CtClass;
import javassist.NotFoundException;

/**
 * Gets a class and adds a method to it and writes it back to the class file.
 * This approach can be used in a Maven plugin to prepare classes during compilation.
 * 
 * @see http://www.ibm.com/developerworks/java/library/j-dyn0916/index.html
 */
public class JassistTiming {

    public static void main(String[] argv) {
        if (argv.length == 2) {
            try {

                // start by getting the class file and method
                CtClass clazz = ClassPool.getDefault().get(argv[0]);
                if (clazz == null) {
                    System.err.println("Class " + argv[0] + " not found");
                } else {
                    // add timing interceptor to the class
                    TimingWrapper.addTiming(clazz, argv[1]);
                    clazz.writeFile();
                    System.out.println("Added timing to method "
                            + argv[0] + "." + argv[1]);

                }

            } catch (CannotCompileException ex) {
                ex.printStackTrace();
            } catch (NotFoundException ex) {
                ex.printStackTrace();
            } catch (IOException ex) {
                ex.printStackTrace();
            }

        } else {
            System.out.println("Usage: JassistTiming class method-name");
        }
    }
}
