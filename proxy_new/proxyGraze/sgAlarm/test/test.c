#include <stdio.h>
#define MONGO_HAVE_STDINT
#include <mongo.h>

void mongo_init_c(mongo *con)
{
  mongo_init(con);
}

int main() {
  return 0;
}
