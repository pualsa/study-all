package org.pualsa.secanno;

import javassist.CannotCompileException;
import javassist.CtClass;
import javassist.CtMethod;
import javassist.CtNewMethod;
import javassist.NotFoundException;

/**
 * Renames a wrapped method, creates a new method with the old signature, the new method invokes the old one and prints
 * the execution time.
 * @see http://www.ibm.com/developerworks/java/library/j-dyn0916.html
 */
public class TimingWrapper {

    protected static void addTiming(CtClass clazz, String mname)
            throws NotFoundException, CannotCompileException {
        //  get the method information (throws exception if method with
        //  given name is not declared directly by this class, returns
        //  arbitrary choice if more than one with the given name)
        CtMethod mold = clazz.getDeclaredMethod(mname);
        addTiming(clazz, mold);
    }

    protected static void addTiming(CtClass clazz, CtMethod mold)
            throws NotFoundException, CannotCompileException {
        String mname = mold.getName();

        //  rename old method to synthetic name, then duplicate the
        //  method with original name for use as interceptor
        String nname = mname + "$impl";
        mold.setName(nname);
        CtMethod mnew = CtNewMethod.copy(mold, mname, clazz, null);

        //  start the body text generation by saving the start time
        //  to a local variable, then call the timed method; the
        //  actual code generated needs to depend on whether the
        //  timed method returns a value
        String type = mold.getReturnType().getName();
        StringBuffer body = new StringBuffer();
        body.append("{\nlong start = System.currentTimeMillis();\n");
        if (!"void".equals(type)) {
            body.append(type + " result = ");
        }
        body.append(nname + "($$);\n");

        //  finish body text generation with call to print the timing
        //  information, and return saved value (if not void)
        body.append("System.out.println(\"Call to method " + mname
                + " took \" + (System.currentTimeMillis()-start) + \" ms.\");\n");
        if (!"void".equals(type)) {
            body.append("return result;\n");
        }
        body.append("}");

        //  replace the body of the interceptor method with generated
        //  code block and add it to class
        mnew.setBody(body.toString());
        clazz.addMethod(mnew);

        //  print the generated code block just to show what was done
        System.out.println("Interceptor method body: " + type + " " + mname + "(..)");
        System.out.println(body.toString());
    }
}
