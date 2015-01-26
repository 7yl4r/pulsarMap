Herein lies a guide for queries of the ATNF Pulsar Catalogue to update this repo's db.

# basic instructions
1. make a query via atnf online catalogue
2. copypasta resulting table into text document
3. find-replace contiguous whitespace with commas; the find regex you want is: ( {1,99})
4. find-replace blank lines (replace \n\n with \n)
5. delete the header & footer of the table (don't forget what those cols mean)
7. find-replace any empty fields (* by default) with whatever you want
6. save & use your fancy new .csv file
7. can also convert to html (use online converter)

# useful conditions and notes
* (Dist < 7.6) = distance less than 1 A*_dist
* (Dist > 1.5) = distance must be at least ~20% of A*_dist
* short table output with no error is probably what you want

# names
name, jname, Bname

# position
GL, ZZ

# choose-your-date position
PosEpoch, GL & PML, ZZ & PMB

# period
P0

# choose-your-date period (first-deriv estimation)
* PEpoch
* P0 & P1_i ideally, but P0 & P1 will also work

# for colorizing
SPINDX or some mapping of flux densities at different frequencies (as used in sizing)

# for sizing of pulsars use one of
* luminosity: R_Lum and R_Lum14
* flux densities: S100, S400, S600, S700, S800, S900, S1400, S1600, S2000, S3000

# useful queries:
## choose-your-own-date-able pulsars (oops forgot GB)
* (Dist < 7.6) && exist(PML) && exist(P1) && exist(PMB)
http://www.atnf.csiro.au/research/pulsar/psrcat/proc_form.php?version=1.51&Name=Name&JName=JName&PosEpoch=PosEpoch&GL=GL&PML=PML&PMB=PMB&P0=P0&P1=P1&PEpoch=PEpoch&ZZ=ZZ&P1_i=P1_i&startUserDefined=true&c1_val=&c2_val=&c3_val=&c4_val=&sort_attr=jname&sort_order=asc&condition=%28Dist+%3C+7.6%29+%26%26+exist%28PML%29+%26%26+exist%28P1%29+%26%26+exist%28PMB%29&pulsar_names=&ephemeris=short&coords_unit=raj%2Fdecj&radius=&coords_1=&coords_2=&style=Short+without+errors&no_value=*&fsize=3&x_axis=&x_scale=linear&y_axis=&y_scale=linear&state=query&table_bottom.x=51&table_bottom.y=32

## choose-your-own-date-able AND colorize-able pulsars (oops forgot GB)
* 162 in query
* (Dist < 7.6) && exist(PML) && exist(P1) && exist(PMB) && exist(SPINDX)
http://www.atnf.csiro.au/research/pulsar/psrcat/proc_form.php?version=1.51&Name=Name&JName=JName&PosEpoch=PosEpoch&GL=GL&PML=PML&PMB=PMB&P0=P0&P1=P1&PEpoch=PEpoch&SPINDX=SPINDX&ZZ=ZZ&P1_i=P1_i&startUserDefined=true&c1_val=&c2_val=&c3_val=&c4_val=&sort_attr=jname&sort_order=asc&condition=%28Dist+%3C+7.6%29+%26%26+exist%28PML%29+%26%26+exist%28P1%29+%26%26+exist%28PMB%29+%26%26+exist%28SPINDX%29&pulsar_names=&ephemeris=short&coords_unit=raj%2Fdecj&radius=&coords_1=&coords_2=&style=Short+without+errors&no_value=*&fsize=3&x_axis=&x_scale=linear&y_axis=&y_scale=linear&state=query&table_bottom.x=56&table_bottom.y=28

# date-able AND colorize-able AND size-able pulsars, sorted descending luminocity@400MHz (currently deployed as pulsarDB)
* name, jname, posEpoch, GL, GB, PML, PMB, P0, PEpoch, SPINDX, Dist, ZZ, r_lum, r_lum14, p1_i
* sort by r_lum decending
* short no errors
* 88 in query (minus #81 w/ missing value)
* (Dist > 1.5) && (Dist < 7.6) && exist(PML) && exist(P1) && exist(PMB) && exist(SPINDX) && exist(R_lum)
http://www.atnf.csiro.au/research/pulsar/psrcat/proc_form.php?version=1.51&Name=Name&JName=JName&PosEpoch=PosEpoch&GL=GL&GB=GB&PML=PML&PMB=PMB&P0=P0&PEpoch=PEpoch&SPINDX=SPINDX&Dist=Dist&ZZ=ZZ&R_lum=R_lum&R_lum14=R_lum14&P1_i=P1_i&startUserDefined=true&c1_val=&c2_val=&c3_val=&c4_val=&sort_attr=R_lum&sort_order=desc&condition=%28Dist+%3E+1.5%29+%26%26+%28Dist+%3C+7.6%29+%26%26+exist%28PML%29+%26%26+exist%28P1%29+%26%26+exist%28PMB%29+%26%26+exist%28SPINDX%29+%26%26+exist%28R_lum%29&pulsar_names=&ephemeris=short&coords_unit=raj%2Fdecj&radius=&coords_1=&coords_2=&style=Short+without+errors&no_value=*&fsize=3&x_axis=&x_scale=linear&y_axis=&y_scale=linear&state=query&table_bottom.x=40&table_bottom.y=21

## same query as above, but cut down a bit for the html table
http://www.atnf.csiro.au/research/pulsar/psrcat/proc_form.php?version=1.51&Name=Name&JName=JName&GL=GL&GB=GB&PML=PML&PMB=PMB&P0=P0&SPINDX=SPINDX&Dist=Dist&ZZ=ZZ&R_lum=R_lum&R_lum14=R_lum14&P1_i=P1_i&startUserDefined=true&c1_val=&c2_val=&c3_val=&c4_val=&sort_attr=R_lum&sort_order=desc&condition=%28Dist+%3E+1.5%29+%26%26+%28Dist+%3C+7.6%29+%26%26+exist%28PML%29+%26%26+exist%28P1%29+%26%26+exist%28PMB%29+%26%26+exist%28SPINDX%29+%26%26+exist%28R_lum%29&pulsar_names=&ephemeris=short&coords_unit=raj%2Fdecj&radius=&coords_1=&coords_2=&style=Short+without+errors&no_value=*&fsize=3&x_axis=&x_scale=linear&y_axis=&y_scale=linear&state=query&table_bottom.x=59&table_bottom.y=20
