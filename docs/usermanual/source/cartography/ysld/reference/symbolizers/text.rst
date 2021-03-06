.. _cartography.ysld.reference.symbolizers.text:

Text symbolizer
===============

The text symbolizer styles labels of vector features.

The full syntax of a text symbolizer is::

  symbolizers:
  - text:
      fill-color: <color>
      fill-opacity: <expression>
      fill-graphic: 
        <graphic_options>
      label: <expression>
      font-family: <expression>
      font-size: <expression>
      font-style: <expression>
      font-weight: <expression>
      placement:
        type: <point|line>
        offset: <expression>
        anchor: <tuple>
        displacement: <tuple>
        rotation: <expression>
      halo:
        radius: <expression>
        fill-color: <color>
        fill-opacity: <expression>
      x-allowOverruns: <boolean>
      x-autoWrap: <expression>
      x-conflictResolution: <boolean>
      x-followLine: <boolean>
      x-forceLeftToRight: <boolean>
      x-goodnessOfFit: <expression>
      x-graphic-margin: <expression>
      x-graphic-resize: <none|proportional|stretch>
      x-group: <boolean>
      x-labelAllGroup: <boolean>
      x-repeat: <expression>
      x-maxAngleDelta: <expression>
      x-maxDisplacement: <expression>
      x-minGroupDistance: <expression>
      x-partials: <boolean>
      x-polygonAlign: <boolean>
      x-spaceAround: <expression>



.. warning:: MIGHT NEED TO ADD SOMETHING ABOUT GRAPHIC


where:

.. list-table::
   :class: non-responsive
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 10 50 20

   * - Property
     - Required?
     - Description
     - Default value
   * - ``fill-color``
     - No
     - Color of inside of the label.
     - ``808080`` (gray)
   * - ``fill-opacity``
     - No
     - Opacity of label fill. Valid values are a decimal value between ``0`` (completely transparent) and ``1`` (completely opaque).
     - ``1``
   * - ``fill-graphic``
     - No
     - A design to be used for the fill of the label. Can either be a mark (common shape) or a URL that points to a graphic. SEE SOMETHING ELSE.
     - None

.. list-table::
   :class: non-responsive
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 10 50 20

   * - Property
     - Required?
     - Description
     - Default value
   * - ``label``
     - Yes
     - Text to display. Often taken from an attribute but any valid expression that constructs a string will do.
     - N/A
   * - ``font-family``
     - No
     - Type of font to be used for the label. Options are system dependent; the full list of fonts available can be found via the GeoServer Server Status page.
     - ``serif``
   * - ``font-size``
     - No
     - Size of the font.
     - ``10``
   * - ``font-style``
     - No
     - Style of the font. Options are ``normal``, ``italic``, and ``oblique``.
     - ``normal``
   * - ``font-weight``
     - No
     - Weight of the font. Options are ``normal`` and ``bold``.
     - ``normal``
   * - ``placement``
     - No
     - Family of options that determine where the label is to be drawn relative to its feature
     - N/A
   * - ``type``
     - No
     - Determines whether the label is to be drawn derived from a ``point`` or a ``line``.
     - ``point``
   * - ``offset``
     - No
     - Value (in pixels) for moving the drawn label relative to the location of the feature. A positive value will shift the label in the direction of its top, while a negative value will shift the label in the direction of its bottom. Only valid for when ``type`` is set to ``line``.
     - ``0``
   * - ``anchor``
     - No
     - Specify the center of the symbol relative to the feature location. Value is an ``(x,y)`` tuple with decimal values from 0-1, with ``(0,0)`` meaning that the symbol is anchored to the top left, and ``(1,1)`` meaning anchored to bottom right. 
     - ``(0.5,0.5)``
   * - ``displacement``
     - No
     - Specifies a distance (in pixels) to which to move the label relative to the feature. Value is an ``(x,y)`` tuple with values expressed in pixels, so (10,5) will displace the label 10 pixels to the right and 5 pixels up. Only valid for when ``type`` is set to ``point``.
     - ``(0,0)``
   * - ``rotation``
     - No
     - Value (in degrees) or rotation of the label. Larger values increase counter-clockwise rotation. A value of ``180`` will make the label upside-down. Only valid for when ``type`` is set to ``point``.
     - ``0`` 
   * - ``halo``
     - No
     - Creates a shaded area around the label for easier legibility
     - No halo
   * - ``radius``
     - No
     - Size (in pixels) of the halo
     - ``1``
   * - ``fill-color``
     - No
     - Color of the halo
     - ``808080``
   * - ``fill-opacity``
     - No
     - Specifies the level of transparency for the halo. Value of ``0`` means entirely transparent, while ``1`` means entirely opaque.
     - ``1``


The following properties are equivalent to SLD "vendor options".

.. list-table::
   :class: non-responsive
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 10 50 20

   * - Property
     - Required?
     - Description
     - Default value
   * - ``x-allowOverruns``
     - No
     - Allows labels on lines to move slightly beyond the beginning or end of the line.
     - ``true``
   * - ``x-autoWrap``
     - No
     - The number of pixels beyond which a label will be wrapped over multiple lines. Cannot use with ``x-followLine``.
     - 0
   * - ``x-conflictResolution``
     - No 
     - Enables conflict resolution, meaning no two labels will be allowed to overlap. Without conflict resolution, symbolizers can overlap with other labels.
     - ``true``
   * - ``x-followLine``
     - No
     - On linear geometries, the label will follow the shape of the current line, as opposed to being drawn at a tangent. Will override
     - ``false``
   * - ``x-forceLeftToRight``
     - No
     - Forces labels to a readable orientation, otherwise will follow the line orientation, possibly making the label look upside-down. This setting is useful when using symbol fonts to add direction markers along a line.
     - ``false``
   * - ``x-goodnessOfFit``
     - No
     - Percentage (expressed as a decimal between 0-1) of the label that must fit inside the geometry to permit the label to be drawn. Works only on polygon features.
     - 0.5
   * - ``x-graphic-margin``
     - No
     - Number of pixels between the stretched graphic and the text. Only applies when ``x-graphic-resize`` is set to ``stretch``.
     - 0
   * - ``x-graphic-resize``
     - No
     - Allows for stretching the graphic underneath a label to fit the label size. Options are ``none``, ``stretch`` or ``proportional``. Used in conjunction with ``x-graphic-margin``..
     - ``none``
   * - ``x-group``
     - No
     - Geometries with identical labels will be considered a single entity to be labeled. Used to control repeated labels.
     - ``false``
   * - ``x-labelAllGroup``
     - No
     - Used in conjunction with ``x-group``. When ``true`` all items in a group are labeled. When ``false``, only the largest geometry in the group is labeled. Valid for lines only.
     - ``false``
   * - ``x-repeat``
     - No
     - Desired distance (in pixels) between labels drawn on a group. If zero, only one label will be drawn. Used in conjunction with ``x-group``. Valid for lines only.
     - 0
   * - ``maxAngleDelta``
     - No
     - Maximum allowed angle (in degrees) between two characters in a curved label. Used in conjunction with ``x-followLine``. Values higher than ``30`` may cause loss of legibility of the label.
     - 22.5
   * - ``x-maxDisplacement``
     - No
     - Distance (in pixels) a label can be displaced from its natural position in an attempt to eliminate conflict with other labels.
     - 0
   * - ``x-minGroupDistance``
     - No
     - Minimum distance (in pixels) between two labels in the same label group. Used in conjunction with ``displacement`` or ``repeat`` to avoid having two labels too close to each other
     - No minimum distance
   * - ``x-partials``
     - No
     - Will display partial labels (truncated on the border of the display area).
     - ``false``
   * - ``x-polygonAlign``
     - No
     - Overrides manual rotation to align label rotation automatically. Valid for polygons only.
     - ``false``
   * - ``x-spaceAround``
     - No
     - Minimum distance (in pixels) between two labels.
     - 0
