import React from 'react';
import { Dropdown } from 'react-bootstrap';

const RecursiveDropdown = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdownMenuButton">
        Dropdown button
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#">Action</Dropdown.Item>
        <Dropdown.Item href="#">Another action</Dropdown.Item>
        <Dropdown.Item>
          Submenu &raquo;
          <Dropdown.Menu>
            <Dropdown.Item href="#">Submenu item 1</Dropdown.Item>
            <Dropdown.Item href="#">Submenu item 2</Dropdown.Item>
            <Dropdown.Item>
              Submenu item 3 &raquo;
              <Dropdown.Menu>
                <Dropdown.Item href="#">Multi level 1</Dropdown.Item>
                <Dropdown.Item href="#">Multi level 2</Dropdown.Item>
                <Dropdown.Item>
                  Sub-submenu item &raquo;
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Sub-submenu item 1</Dropdown.Item>
                    <Dropdown.Item href="#">Sub-submenu item 2</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item href="#">Submenu item 4</Dropdown.Item>
            <Dropdown.Item href="#">Submenu item 5</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default RecursiveDropdown;





