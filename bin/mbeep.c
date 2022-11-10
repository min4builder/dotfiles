#include <stdio.h>

int
main()
{
	/* Boot beep routine
	 * originally ported from https://www.folklore.org/html/BootBeep.html
	 *
	 * make an attractive beep to tell the world that the CPU works. Use
	 * Charlie Kellner's filter algorithm. First fill the waveForm buffer
	 * with the initial waveForm. */

	unsigned char a4[760];
	unsigned char *a0 = a4;

	for (int d0 = 5; d0 > 0; d0--) {
		for (unsigned d1 = 0xFA40C006; d1; d1 >>= 8) {
			for (int d2 = 19; d2 > 0; d2--) {
				*a0 = d1 & 0xff;
				a0 += 2;
			}
		}
	}

	/* OK, now filter it for a nice fade -- repeat the filtering
	 * process 40 times */
	for (int d3 = 40; d3 > 0; d3--) {
		a0 = a4;
		unsigned char *a1 = &a0[146];
		for (int d0 = 74; d0 > 0; d0--) {
			*a0 = ((unsigned short)a1[0]
			     + (unsigned short)a1[4]
			     + 2*(unsigned short)a1[2]
			     + 3) >> 2;
			a0 += 2;
			a1 += 2;
		}

		/* now copy first 74 values into the rest of the buffer */
		for (int d0 = 296; d0 > 0; d0--) {
			*a0 = a0[-74];
			a0 += 2;
		}

		/* now wait for blanking before repeating */
		for (int i = 0; i < 740; i += 2) {
			putchar(a4[i]);
		}
		fflush(stdout);
	}

	/* all done with our boot beep */
	return 0;
}
