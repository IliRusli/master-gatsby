import styled from "styled-components";

const MenuItemStyles = styled.form`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0 1.3rem;
  align-content: center;
  align-items: center;
  .gatsby-image-wrapper {
      grid-row: span 2;
      height: 100%;
  }
  p {
      margin 0;
  }
  button {
      font-size: 1.5rem;
  }
  button + button {
       margin-left: 1rem;
  }
  .remove {
      top: 0;
      position: absolute;
      font-size: 3rem;
      background: none;
      color: var(--red);
      right: 0;
      box-shadow: none;
      line-height: 1rem;
  }
`;

export default MenuItemStyles;
