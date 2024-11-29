import React from "react";
import CartContainer from "../cart/CartContainer";
import AccordionContent from "./AccordionContent";

function CartAccordion({ id, title, children, containerSx }) {
  return (
    <CartContainer sx={{ mt: "3rem", ...containerSx }}>
      <AccordionContent defaultExpanded={true} expanded={true} id={id} title={title}>
        {children}
      </AccordionContent>
    </CartContainer>
  );
}

export default React.memo(CartAccordion);
