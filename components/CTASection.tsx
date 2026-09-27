export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-gold to-terracotta text-white py-16 md:py-24">
      <div className="container-max text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
          Готовы присоединиться?
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-95">
          Регистрация открыта. Станьте частью главного события индустрии сыроделия 2027 года.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-gold font-semibold rounded hover:bg-gray-100 transition text-base md:text-lg">
            Зарегистрироваться
          </button>
          <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded hover:bg-white hover:text-gold transition text-base md:text-lg">
            Узнать больше
          </button>
        </div>
      </div>
    </section>
  )
}
