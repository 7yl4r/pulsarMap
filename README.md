pulsarMap
=========

A little app for making an updated version of the interstellar pulsar map included on the pioneer plaque and the voyager golden record, along with custom pulsar maps in the same style.

![img](http://i.imgur.com/lmJqpWt.png)

Read more about it [here](http://rsimulate.com/2014/10/25/interstellar-pulsar-mapping-in-javascript/).

Looking for the src? See the gh-pages branch!

The "custom" pulsar database included is from the ATNF Pulsar Catalogue, so thanks to all that awesome work. Read more in the article Manchester, R. N., Hobbs, G. B., Teoh, A. & Hobbs, M., Astron. J., 129, 1993-2006 (2005) (astro-ph/0412641), which gives a full description of the catalogue, or visit http://www.atnf.csiro.au/research/pulsar/psrcat.

The query used was:
http://www.atnf.csiro.au/research/pulsar/psrcat/proc_form.php?version=1.50&Name=Name&P0=P0&P1=P1&Dist=Dist&ZZ=ZZ&XX=XX&YY=YY&startUserDefined=true&c1=c1&c1_val=error%28P0%29&c2=c2&c2_val=error%28Dist%29&c3=c3&c3_val=error%28ZZ%29&c4=c4&c4_val=error%28P1%29&sort_attr=Dist&sort_order=asc&condition=exist%28Dist%29+%26%26+exist%28P0%29+%26%26+exist%28P1%29+%26%26+exist%28ZZ%29+%26%26+exist%28YY%29+%26%26+exist%28XX%29+%26%26+%28error%28P0%29+%3C+1.0e-10%29&pulsar_names=&ephemeris=short&coords_unit=raj%2Fdecj&radius=&coords_1=&coords_2=&style=Long+with+last+digit+error&no_value=*&fsize=3&x_axis=&x_scale=linear&y_axis=&y_scale=linear&state=query&table_bottom.x=90&table_bottom.y=22
