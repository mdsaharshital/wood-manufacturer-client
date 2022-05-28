import React from "react";
import Footer from "../../components/Footer";
import SentionTitle from "../../components/SentionTitle";

const Blog = () => {
  return (
    <div>
      <div className="my-4">
        <SentionTitle>My Blogs </SentionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 mx-20 my-10">
          <div className="px-5">
            <h1 className="text-2xl font-bold py-5">
              How will you improve the performance of a React Application?
            </h1>
            <h1 className="text-xl font-bold">Ans: </h1>
            1. Keeping component state local where necessary. <br />
            2. Memoizing React components to prevent unnecessary re-renders.{" "}
            <br />
            3. Code-splitting in React using dynamic import. <br />
            4. Windowing or list virtualization in React. <br />
            5. Lazy loading images in React. <br />
          </div>
          <div className="px-5">
            <h1 className="text-2xl font-bold py-5">
              How does prototypical inheritance work
            </h1>
            <p>
              Every object with its methods and properties contains an internal
              and hidden property known as <b>Prototype</b>. The Prototypal
              Inheritance is a feature in javascript used to add methods and
              properties in objects. It is a method by which an object can
              inherit the properties and methods of another object.
              Traditionally, in order to get and set the <b>Prototype</b> of an
              object, we use Object.getPrototypeOf and Object.setPrototypeOf.
              Nowadays, in modern language, it is being set using{" "}
              <b>__proto__.</b>
            </p>
          </div>
          <div className="px-5">
            <h1 className="text-2xl font-bold py-5">
              What is a unit test? Why should we write unit tests?
            </h1>
            Unit testing involves testing individual components of the software
            program or application. The main purpose behind this is to check
            that all the individual parts are working as intended. A unit is
            known as the smallest possible component of software that can be
            tested. Unit testing ensures that all code meets quality standards
            before it's deployed. This ensures a reliable engineering
            environment where quality is paramount. Over the course of the
            product development life cycle, unit testing saves time and money,
            and helps developers write better code, more efficiently.
          </div>
          <div className="px-5">
            <h1 className="text-2xl font-bold py-5">
              You have an array of products. Each object has a name, price,
              description, etc. How will you implement a search to find products
              by name?
            </h1>
            First of all all i need to know is the product name, when i type the
            name and click on search button i will get the value, and while
            mapping the array of objects, i'll give a condition to call includes
            that will help me find the product and i'll return the wholle
            product as a search object. thats how i can find a product by
            searching.
          </div>
          <div className="px-5">
            <h1 className="text-2xl font-bold py-5">
              {" "}
              Why you do not set the state directly in React. For example, if
              you have const [products, setProducts] = useState([]). Why you do
              not set products = [...] instead, you use the setProducts
            </h1>
            we cannot directly set the value of products. beacuse it is
            immutable. we cannot set it directly . While a React component can
            have initial state, the real power is in updating its state — after
            all, if we didn't need to update the state, the component shouldn't
            have any state. State is only reserved for data that changes in our
            component and is visible in the UI. Instead of directly modifying
            the state using this.
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
