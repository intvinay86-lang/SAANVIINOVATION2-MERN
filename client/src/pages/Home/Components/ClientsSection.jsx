function ClientsSection() {
  const clients = [
    {
      name: "Client 1",
      logo: "https://saanviinnovation.com/assets/img/clients/client-1.png",
    },
    {
      name: "Client 2",
      logo: "https://saanviinnovation.com/assets/img/clients/client-2.png",
    },
    {
      name: "Client 3",
      logo: "https://saanviinnovation.com/assets/img/clients/client-3.png",
    },
    {
      name: "Client 4",
      logo: "https://saanviinnovation.com/assets/img/clients/client-4.png",
    },
    {
      name: "Client 5",
      logo: "https://saanviinnovation.com/assets/img/clients/client-5.png",
    },
    {
      name: "Client 6",
      logo: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMREhMQExAWEBUXGBYVFhAVGRgXEBURFRYWFxYYFhYYHyggGhslHxYXITEhJSwtLjExFyA/ODMsQygxMS0BCgoKDg0OGBAQGi0lHSUtListLSsvLS0tLS0tLS0tLS0tLS0tLS0tKy0tKy0tLS0tKy0tNystLS0rKystLS0rK//AABEIAKAAoAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAABgUHAgMECAH/xABCEAABAwIEAwYEAwMJCQAAAAABAAIDBBEFBhIhBzFBEyJRYXGRFDJCoSNSgXKy0RZDU2KCkqKxwRUXJDNEg8Lh8f/EABgBAQEBAQEAAAAAAAAAAAAAAAACAQME/8QAHREBAQEBAQEBAQEBAAAAAAAAAAERAiExQRJhIv/aAAwDAQACEQMRAD8AvFCEIBCEIBCEIBCxc8DmVxVOKxs5uCDvQliqzjCz6go2TiDCPqC3GaeUJGj4gwn6gpKlzjC/6gmGmdC4KbFY38nBdrXg8ljWSEIQCEIQCEIQCEIQCELGR4AuUH0myhsYzBFACS4JfzjnNlOC0HdUfmLNUk7j3jZVzzqb1iw8y8SrXDHKvcTzlNKT3z7pZfITzKwXWcyOd6td02KyO5vPutBq3/mK0IVJbxVP/MVvhxWRvJ591woTA04ZnKaIjvn3VhZb4lcg9ypRZMkI5FTeZVTqx62wjMEU4FnBTIN15Vy7mqSBw7xsrwydnNlQA0ndcuucdJ1p7QsY3hwuFkpUEIQgEIQg+ONki57zWKdhaDup/M+LCCJxvbZeb83446eQ964uq551PVxw49jT53kkqHQpOky9VytD46WWRp5OYxzmn0IC7/HL6jELuxLBqim09vTyQar6TIxzQ63O1xvzXCjAhSlFlyrmYJYqWWVhvZ7GOc02NjuFqxHBqinAM1PJCCbAvaWgkdASmjgQu2gwmecEwwSSgbEsaXAE9CQttVl+qiaZJKWWNg5vcxwaPUlNMRqELvwvBqiq1Cnp5J9NtXZsc7Tflew25H2QcCl8Cxl8DwQV9q8q1sTHSSUU0bGi7nujcGtHiSRsodPrfj0tkPNYnYGk7p7abrynlHHHQSN71hdekcsYsJ4mm99guHXOOvN1OIQhSoLGR1gSslG47U9nE4+SCpeK2YOcYKpuR1zdMWdMQMszt+pS2u/MyOPV9Cb+H2eJMNlDTeSncfxIuo/rM8D5dbJQQqs1kuPWOI0lJi1GAbTQyDUx4+Zp6OafpcP4grzhnXKM2Gzdm/vxuuYpwO69vgfBw6hSPDnPUmGyaH3kpnnvx9WH87PPxHVXpidLTYjTaXaZ4ZQHNePs5h6OH8QeoXL3i/4vzqKByLnGTDpLbvgefxIvtrZ4OH35HoRdVU2nxCm3tNDKLgj/ADHVrgf1BCqz/dbUCsMBP/DjvfFdDHfkB/SdLfryVmltNh1NYWhhjHM8yfE9XOJ/Up3n43nf1pYynw+nttDDGNz1J8T1c4n3VPZ0zdJXv0i8cDT3IupP5n25u/y+5uV9PBXwWNpoZBcEfYg8w4H9QVWVTwuqfjG08fehd3hUn5WMHMPH5xfl197OM/TrfxAZNypPiU4hiFmixkmI7kbPE+J8B19yvSWF4ZS4TSaGkQxRjVJK75nO6veerj/ADoteCYbSYRRmxEMUY1SSu+ZzurnHq48gPQBURxIz/JicnZsvHTMPci6vI+uTz8B0+633u/4zzmDiPn2TEpOzjvHTMPcj5OeR9cnn4DoklCF0kxFuso3WN1cnCnMG4jJVMpkyVXmKdm/VT1Njeb69WRuuAVko3AantImnyUkuDsEo8QKrRA7fom5V7xTltCfRbPrK89YnJqkcfMrkW2pPePqtS9DgEIW6lpJJTpjjdI78rGlzvYLRpT1w5zfLQbSte6ie/S59iWxSkXu0+NrEt6hcmC8N8QnewOp3U8ZI1Sy2aWt6nQSHE+VvZWt/J6aIspI46Y4e1mh8MmozzONi6QkMsHX5b+22mOup8XzKma/FYY4TUulaIg0P7S92lp5abc77WA53VcYxiwcBiNY20YJNDh55vd0mlHsfAD1F52jyGyKQB1Q+amjcZIaN+8bJD1dv3gOgt1PneJxrh5LWTOmmxAuceQEPda3o1o7XYBRMirrHAsZbGPj6VpNO43rKEbup3nnLEPy+NtiB5d2zaXF6f4f4vtm9hp19rfu6f49Lc7quMB4bVFJK2eCvbqGxa6Ihj29WuAebgqYxThe6okY2OoNPTOd2k9IwksEtucIOwv58vslwmq84h5znxNzixr2UcTgGtAOkuN9LpDy1EA2HT3SQr8lwatif8GMMjOFkGN0Eb2OmINvx3OJDjICAdv8A2qqzjkuooJns7N8kXzMnDSWFh5aiBYOHIhXzZ8R1L9LCEIVpC68Lk0yNPmuRbaY94eqwen+HtVrgbv0Tcq84VyXhHorDXnv13gVecVI7xH0VhpO4h0uuB3ok+leYqgd4+q7aHDmOs6aoZAz9XykeUbN/71lprgWSHoQbj1BTRnPDxO2jroIwBUtbG5jBYCpZ3S0AeP8A4rvrjj5RYrhNLu2hlr3j66h4jiv5Rsvcet1JO4uVTG6KelpaVnRrIzt9wPsuziplGOmpaKSGzjCBST6f6YjtQTbqS95/tNU1g9LHSVOE4UY2F+iWepu1pJkfDIWsJI+nfbyap8zVekKr4lYnJzqy0eDGRt+4bf7qLnzXXP8Amrqj0ErwPYGyb8z1mKdnO2TD4o4bOBlEDWkR3sCHA7HzUTxWia2tAa0NHYxbAAC+/QLZjLpbfjFQedTMfWR5/wBVr/2jN/TSf33fxTXxFjaIsMs0C9JGTYWudDOaUaEfiR/tt/eCqMrazFqgcqiUej3D/VdcGaK1ny11Q3/uvt7XTTnnJ1ZLXzvp6J7oiWaSxtmbRsBtbzBTTiWUI5p8PZUM7GKnw9s9U0DS89nYOaSN7k8zzsCp/qNyq/puIuJx8q6Q/thr/wB8FTNHxhxFnzdjN+2yx/wELCfihMx2impKaCnGzacxA3Z/XN9yetrIzJgsFZFR4jSRCnFTMKaanb8jKgnYsHQGx+3imT9h7+V2T8SKSp2rcGhkPWRhDZB42Jbq/wASi6unwOo3imqcOcfplZ20F/AaCX/qT+i28XMvCnrBLCLxTg2DeQmYdEjfW4B/tFSOcsqNo6TC9hrbIWTnn+NLoksfQAj0AWTPMbdJOI4CYwXx1EFSwb6opBrt5xP0yf4beajaYd4eqvPOM+JxVUjKPDYZYAGaXmFriSWgu3uOt1TLdUlS4vaGvMji5oFgHFxJAHQA3VS7GWYvzhUy0I9FYiTuHVLogb6JxXC/XWBReYaXtInDyUosJWXBCxryhm+hMcztupTdwlxmARzw1Ni2nPx0V+j4hZ1vPdpA9V38VcAsTIAqluWk2JHMG3UHmF3n/Ucr5VpcMMxsqaisgrCHMnd8YA75WzQO7U28tLQfSOyjcnYwazH21Tv5x0xaD0jEMgYP0aAFDZRwOCanq6uonlgZB2bT2QDnETEx2sem9vQlMGH8OI3SPPxMskXw8dTC+Jg7Z7JNQ0lh+ru9PFZc9JviNzFlzFmieWXtexGtzrztc3s7k/Lr3FullLcSMrVdROamKLXE2Fup+tgtoDi7ulwOw8lwSZRhD5nST1MVPBC2SXtWaZy+R7mtaxvKx0jfx9xop8tU8rjIzEHOpWwmaQ/9RHb+bc0G1z4+R2TRM5pytV1sGHOp4e0DaWIEl7G2JjjI+ci6rahH4sf7bf3gnnDcnxVD6V8FXKaeYyM3Fpo3xtcQLcjfSfZRmacqR01MyrikmAdKYjFUR9lNfSXagOrdrcuoWy/jLP10cScVnjxKpbHUSsaDHZrHuDReJh2ANk81WYIoJsObVOPY1WGNglkJuWmSx1uPPxBP9a/RK1Jw+hdSQVEk87XzRGUTti10cZsSGSubdwO255Ln/k3hpohXGtqSwP7C3ZtuJtGuwF/l81njfWFZwprxJaBrKmE7sqWSMDCw8iQXXG3hfyum3BIIYZsOwdkrZ3QyvrKqVm8bZWMdpYD1sSB+g9Etx5NDauWiFVK1jaM1Wxtd+lp0lvK262Q5CpXOp6ZlbKyrnp21DGuYOwOprnaS4G4+V3slu/aTx35Mx+nqjVCsN2wTvxGEnyc4vYPK5abdbrVhNe/EcOr3v70jKyGrt+USOawgeQa13suCPIMTGtnlqZIoBRxVU5DQZA+VxaImDluW8yoPM2AR08NPV0s75aeo1gaxolY+M2LXgGx62PkUyHqw+IeW8YnrpZaQy9gRHp01DY23DGh1mF4tuD0Vd5bwx5qzG8d9ry19zc62uIdv13B3S+2d5Pzu9yrX4VYCXOEhHndL5Ce1cGXaXs4mjyUqsIWWACzXF1CEIQLmb8HE8Tha5svN2aMHdBIQRYXXrJ7biyrjiFlETNL2jdXz1iepqnsq4/TwU9XS1MMkrKjsv+U4NcOycXDc+dlPUnEaIPkBp5Y4fh46aFkUlpY449W+vbvHVzHgElYthjoXlpCjl1yVy2w9NzhS6pY3RVM0E8TY5e1l1zh7HucxzHHoL8tt/vpp820sbzEyi00roTDIAQKiS/8AOOcObh4X8d+iS0J/MNp9w/PEFM+mZDTyCngMjyHOBmkkka5oJ6C2o+6iMXzU6qoY6aYvlmZMZBO4g/hlpGm/PnY/ollCfzDasfLXEGnpIobQVAliYWGFk1qGZxv35I3Xs7e5sOiV3Y+04caDsyHGpNRrFtAaYwzSBz6KAQmQ2rGl4gU1nVApZPjHUvwhcXt+GAsBrAtqvsDb/wCobn+lY6CqZSSOq4KdtPG9zx2A0tc3XpAufmdt5quUJ/MP6qwmZ/hc1kE1O+SA0cVLMA4CQviJc2Rh5cydioLNGYop4aejpoXQ08Gst7RwdK98hu5ziNh6DxKWlIYThjpnhoF0yQ2125Ywd08jQBcXXpLKGDiCJotY2Szw9yiIWh7hurHY2wsuXXWuvMxkhCFCghCEAtc0QcLELYhBWud8jtmBe1u6pPG8vyQOILSvWj2A7FLmPZVinB7ov6K+esTedeU3NsvitfMnDdzSSxqRK/LU0ZN2H2XWdSud5sQaF0SUbxzaVqMR8FqWCFmIj4LbHRvPJpQc6+ht1N0GWppDsw+yest8N3usXtWXqRU5tIuCZfkncAGlXZkjIzYQHubumXAMqxQAd0XTGxgGwXLrrXSc4xhiDRYBbEIUKCEIQCEIQCEIQCEIQa5IQ7mFFVuXopObQplCBHrOH8L/AKQoqXhlGegVmoW7WZFZRcMox0ClaLh/Cz6QnhCbTIhqLL0UfJoUrHCG8gtiFjQhCEAhCEAhCEH/2Q==",
    },
    {
      name: "Client 7",
      logo: "https://saanviinnovation.com/assets/img/clients/client-7.png",
    },
    {
      name: "Client 8",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC-bz5ylnxTELXamceQD5d6p_LBaXxzIKD40Ab9ptjAL8hH8AV",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-4">
            <span
              className="text-orange-500 font-semibold text-lg uppercase tracking-wider bg-orange-50 px-4 py-2 rounded-full"
              style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
            >
              Trusted Partners
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 uppercase tracking-wide"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            Our Clients
          </h2>
          <p
            className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            Trusted by leading companies worldwide to deliver exceptional
            digital solutions and drive business growth.
          </p>
        </div>

        {/* Simple Image Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
          {clients.map((client, index) => (
            <div
              key={index}
              className="group flex items-center justify-center opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={client.logo}
                alt={client.name}
                loading="lazy"
                className="max-w-full h-12 md:h-16 object-contain transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClientsSection;
