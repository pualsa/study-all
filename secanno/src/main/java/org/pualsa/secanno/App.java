package org.pualsa.secanno;

/**
 * Hello world!
 *
 */
public class App {

    @Timing
    private String buildString(int length) {
        String result = "";
        for (int i = 0; i < length; i++) {
            result += (char) (i % 26 + 'a');
        }
        return result;
    }

    @Timing
    @Override
    public String toString() {
        return super.toString();
    }

    public static void main(String[] argv) {
        App inst = new App();
        for (int i = 0; i < argv.length; i++) {
            String result = inst.buildString(Integer.parseInt(argv[i]));
            System.out.println("Constructed string of length " + result.length());
        }
    }
}
