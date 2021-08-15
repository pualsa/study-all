package org.pualsa.secanno;

import javassist.CannotCompileException;
import javassist.ClassPool;
import javassist.CtClass;
import javassist.CtMethod;
import javassist.Loader;
import javassist.NotFoundException;
import javassist.Translator;

/**
 * <p>Changes methods on the fly: adds the timing wrapper to each method with the Timing annotation.</p> <p>Execute:
 * ...target\classes>java -cp javassist-3.16.1-GA.jar;. org.pualsa.secanno.AnnoJassistTiming</p>
 *
 * @see http://www.ibm.com/developerworks/java/library/j-dyn0203/index.html
 * @see http://www.csg.ci.i.u-tokyo.ac.jp/~chiba/javassist/tutorial/tutorial.html
 */
public class AnnoJassistTiming {

    public static void main(String[] args) {
        if (args.length == 0) {
            args = new String[]{"org.pualsa.secanno.App", "1000", "2000", "3000"};
        }

        if (args.length >= 1) {
            try {
                // set up class loader with translator
                Translator xlat = new AnnoTimingTranslator();
                ClassPool pool = ClassPool.getDefault();
                Loader loader = new Loader();
                loader.addTranslator(pool, xlat);

                // invoke "main" method of target class
                String[] pargs = new String[args.length - 1];
                System.arraycopy(args, 1, pargs, 0, pargs.length);
                loader.run(args[0], pargs);
            } catch (Throwable t) {
                t.printStackTrace();
            }
        } else {
            System.out.println("Usage: JavassistRun main-class args...");
        }
    }

    /**
     * Translates each class loaded by the javassist classloader.
     */
    public static class AnnoTimingTranslator implements Translator {

        public void start(ClassPool pool) throws NotFoundException, CannotCompileException {
        }

        /**
         * wraps each method annotated with @Timing.
         */
        public void onLoad(ClassPool pool, String cname) throws NotFoundException, CannotCompileException {
            if (cname.startsWith("org.pualsa.secanno")) {
                CtClass clas = pool.get(cname);
                CtMethod[] methods = clas.getDeclaredMethods();
                System.out.println("Adding to " + cname);
                try {
                    for (CtMethod m : methods) {
                        if (m.getAnnotation(Timing.class) != null) {
                            System.out.println("Wrapping method: " + m);
                            TimingWrapper.addTiming(clas, m);
                        } else {
                            System.out.println("Skipped method: " + m);
                        }
                    }
                } catch (ClassNotFoundException cnf) {
                    throw new NotFoundException(cnf.getMessage());
                }
            }
        }
    }
}
